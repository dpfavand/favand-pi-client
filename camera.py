import io
import picamera
import sys

stream = io.BytesIO()

with picamera.PiCamera() as camera:
    # print("test")
    camera.capture(stream, format='jpeg')

stream.seek(0)

sys.stdout.buffer.write(stream)