package com.tedictapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.reactnative.photoview.PhotoViewPackage;
import cl.json.RNSharePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.brentvatne.react.ReactVideoPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.sbugert.rnadmob.RNAdMobPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FIRMessagingPackage(),
            new RNAdMobPackage(),
            new PhotoViewPackage(),
            new RNSharePackage(),
            new LinearGradientPackage(),
            new ReactVideoPackage(),
            new RNFetchBlobPackage(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new ReactNativeConfigPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
