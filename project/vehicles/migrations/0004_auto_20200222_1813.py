# Generated by Django 3.0.2 on 2020-02-22 18:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0001_initial'),
        ('vehicles', '0003_auto_20200222_1730'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='vehicle',
            options={'ordering': ('id',)},
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Company'),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='distance_passed',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='manufactured',
            field=models.DateField(blank=True, null=True),
        ),
    ]
