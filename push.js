var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BCVH14fcKYnEveX_9rkosKjlQWxyPJOBI7YSRT6j9DWrVA5M18uJocoqb4SlDVtbiU19_2MJhY0ihl6tmaV0iMw",
   "privateKey": "Ojsz6baRAgMx_ChZlU16C2Kj2GdOQ3nRrrwnO-7esRA"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint":"https://fcm.googleapis.com/fcm/send/ehXiBp71u0c:APA91bGbRclZqkdlaZMBoO4iuMihk18kk4zXVXks2Pq7nXaOCnspTzZkdV0BZ_Qog_7TZ6ulPpdjCLuvwFksivxH596mSKHg4dcv5U9bsDSx75v1Pbxqs_ZzDgSieN3_H49pdTJ0II5G",
   "keys": {
       "p256dh": "BMHtx6Lt/Duyc3LXMDQfR8/uIb7Jjg25QwXdtpE354RVXPhiNH0+D2OxJOev5ZkMOfvMO4p5d8XhrWY9KSevwTc=",
       "auth": "NgXKPqGe9b1VA0k3cstWXw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1087400269409',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);