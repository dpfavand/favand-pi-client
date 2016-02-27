import sys
import picamera
with picamera.PiCamera() as camera:
    sys.stdout.write('test')
    sys.stdout.flush()
    sys.stdout.close()
    # camera.capture(sys.stdout, format='jpeg')