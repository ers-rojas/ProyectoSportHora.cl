# backend/pagos/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PagoViewSet, WebpayInitMembresiaView, WebpayCommitView

router = DefaultRouter()
router.register(r'pagos', PagoViewSet)

urlpatterns = [
    path('webpay/init/', WebpayInitMembresiaView.as_view(), name='webpay_init'),
    path('webpay/commit/', WebpayCommitView.as_view(), name='webpay_commit'),
    path('', include(router.urls)),
]