from flask import Flask, request, jsonify
import base64
import numpy as np
import tensorflow as tf
from PIL import Image
from io import BytesIO, StringIO

app = Flask(__name__)

# # Load the pre-trained model once when the application starts
model = tf.keras.models.load_model('models/plantTypeModel.h5')

PlantTypes = ['Potato', 'Tomato', 'Bell_Pepper']
Potato = ['Early_Blight', 'Late_Blight', 'Healthy']
Tomato = ['Bacterial_Spot', 'Early_Blight', 'Healthy']
Bell_Pepper = ['Bacterial_Spot', 'Healthy', 'Late_Blight']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image data from the request
        image_data = request.json.get('image')

        image_bytes = base64.b64decode(image_data)
    
        # Convert bytes to a PIL Image object
        image = Image.open(BytesIO(image_bytes)).convert('RGB')
        
        # Convert PIL Image to NumPy array
        img_array = np.array(image)
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        # Convert to TensorFlow tensor
        img_tensor = tf.convert_to_tensor(img_array, dtype=tf.float32)
        
        # create random predictions for testing
        predictions1 = np.random.randint(0, 100, size=(1, 3))
        PlantType = np.argmax(predictions1)
        
        if PlantType == 0:
            predictions2 = np.random.randint(0, 100, size=(1, 3))
            disease = Potato[np.argmax(predictions2)]
        elif PlantType == 1:
            predictions2 = np.random.randint(0, 100, size=(1, 3))
            disease = Tomato[np.argmax(predictions2)]
        else:
            predictions2 = np.random.randint(0, 100, size=(1, 3))
            disease = Bell_Pepper[np.argmax(predictions2)]
            
        PlantType = PlantTypes[PlantType]
        predictions = [PlantType, disease]
        predictions = np.array(predictions)
        return jsonify({'predictions': predictions.tolist()})
            

    except KeyError as e:
        return jsonify({'error': f'Missing key: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    # return jsonify({'predictions': [1, 2, 3, 4, 5]})

if __name__ == '__main__':
    app.run(port=6000)


# print("Server is running on port 5001")


import tensorflow as tf
import tf2onnx
import onnx

model = tf.keras.models.load_model('models/plantTypeModel.h5')
onnx_model, success = tf2onnx.convert.from_keras(model)
onnx.save_model(onnx_model, "plantTypeModel.onnx")