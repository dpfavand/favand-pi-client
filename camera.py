import sys
import picamera
with picamera.PiCamera() as camera:
    camera.capture(sys.stdout)