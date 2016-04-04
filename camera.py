import io
import picamera
import base64

stream = io.BytesIO()

with picamera.PiCamera() as camera:
    # print("test")
    camera.resolution = (640, 480)
    camera.capture(stream, format='png')

print(base64.b64encode(stream.getvalue()))