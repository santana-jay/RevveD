import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
# from service_rest.models import Something
from service_rest.models import AutomobileVO
# import logging
# logging.basicConfig(level=print)

def poll(repeat=True):
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            url = 'http://project-beta-inventory-api-1:8000/api/automobiles'
            print(f'Sending GET request to: {url}')
            response = requests.get(url)
            print(f'Response content: {response.content}')
            content = json.loads(response.content)
            print(content)
            for automobile in content['autos']:
                AutomobileVO.objects.update_or_create(
                    vin=automobile['vin'],
                    defaults={'sold': automobile['sold']}
                    )

        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
