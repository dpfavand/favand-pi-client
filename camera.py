import sys
import picamera
with picamera.PiCamera() as camera:
    print("test")
    # camera.capture(sys.stdout, format='jpeg')