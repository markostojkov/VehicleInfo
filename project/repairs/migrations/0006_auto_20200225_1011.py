# Generated by Django 3.0.2 on 2020-02-25 10:11

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('repairs', '0005_auto_20200225_1010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repair',
            name='date_of_repair',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
