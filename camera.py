import io
import picamera
import sys
import base64

stream = io.BytesIO()

with picamera.PiCamera() as camera:
    # print("test")
    camera.capture(stream, format='jpeg')
    pass

print(base64.b64encode(stream.getvalue()))