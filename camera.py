import io
import picamera

stream = io.BytesIO()

with picamera.PiCamera() as camera:
    print("test")
    camera.capture(stream, format='jpeg')

stream.seek(0)

print(stream.getvalue())