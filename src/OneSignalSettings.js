/**
|--------------------------------------------------
| OneSignal Settings
|--------------------------------------------------
*/
export const oneSignalSettings = document.addEventListener('deviceready', function () {
    if (window.cordova) {
      // Enable to debug issues.
      //window.plugins.OneSignal.setLogLevel({ logLevel: 4, visualLevel: 4 });
  
      window.plugins.OneSignal
        .startInit("2c00f0d5-54da-4c20-be9b-ee3709005c78")
        .handleNotificationReceived(function (data) { })
        .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
        .endInit();
      window.plugins.OneSignal.enableSound(true);
      window.plugins.OneSignal.enableNotificationsWhenActive(true);
      window.plugins.OneSignal.getIds(function (ids) {
        localStorage.setItem('local_device_id', ids.userId);
      });
    }
  
}, false);