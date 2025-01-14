from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True,)
    sold = models.BooleanField(default=False)


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.employee_id and self.first_name and self.last_name:
            self.employee_id = (self.first_name[0] + self.last_name).lower()

        if self.employee_id:
            counter = 1
            employee_id = self.employee_id

            while Technician.objects.filter(employee_id=employee_id).exists():
                employee_id = f'{employee_id}{counter}'
                counter += 1
            self.employee_id = employee_id
            super().save(*args, **kwargs)


class Appointment(models.Model):
    date_time = models.DateTimeField(blank=True)
    reason = models.TextField()
    status = models.CharField(max_length=200)
    vin = models.CharField(max_length=100)
    customer = models.CharField(max_length=200)
    is_vip = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name='appointments',
        on_delete=models.CASCADE
    )
