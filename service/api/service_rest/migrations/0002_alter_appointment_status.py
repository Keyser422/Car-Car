# Generated by Django 4.0.3 on 2024-03-20 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(default='pending', max_length=200),
        ),
    ]