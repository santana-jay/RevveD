from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True,)
    sold = models.BooleanField(default=False)


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True, blank=True)

    # use the auto generated id and save it as the employee id
    def save(self, *args, **kwargs):
        if not self.employee_id:
            self.employee_id = (self.first_name[0] + self.last_name).lower()
            super().save(*args, **kwargs)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=200)
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name='appointments',
        on_delete=models.CASCADE
    )
