import sys
import picamera
with picamera.PiCamera() as camera:
    sys.stdout.write('test')
    # camera.capture(sys.stdout, format='jpeg')