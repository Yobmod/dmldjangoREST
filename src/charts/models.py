#import qrcode
from io import StringIO

from django.db import models
from django.urls import reverse
from django.core.files.uploadedfile import InMemoryUploadedFile


# class Event(models.Model):
# 	title = models.CharField(max_length=255)
# 	description = models.TextField(blank=True)
# 	qrcode = models.ImageField(upload_to='qrcode', blank=True, null=True)
#
# 	def get_absolute_url(self):
# 		return reverse('events.views.details', args=[str(self.id)])
#
# 	def generate_qrcode(self):
# 		qr = qrcode.QRCode(
# 			version=1,
# 			error_correction=qrcode.constants.ERROR_CORRECT_L,
# 			box_size=6,
# 			border=0,
# 		)
# 		qr.add_data(self.get_absolute_url())
# 		qr.make(fit=True)
#
# 		img = qr.make_image()
#
# 		buffer = StringIO.StringIO()
# 		img.save(buffer)
# 		filename = 'events-%s.png' % (self.id)
# 		filebuffer = InMemoryUploadedFile(
# 			buffer, None, filename, 'image/png', buffer.len, None)
# 		self.qrcode.save(filename, filebuffer)
