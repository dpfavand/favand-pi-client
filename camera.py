import sys
import picamera
with picamera.PiCamera() as camera:
    sys.stdout.write('test', format='jpeg')
    camera.capture(sys.stdout)