# Generated by Django 3.0.2 on 2020-02-29 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0002_auto_20200229_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='currencies',
            field=models.CharField(choices=[('USD', 'USD'), ('CHF', 'CHF'), ('GBP', 'GBP'), ('EUR', 'EUR'), ('MKD', 'MKD')], default='EUR', max_length=20),
        ),
    ]
