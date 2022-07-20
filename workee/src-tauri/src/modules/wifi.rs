
use tauri::Manager;
use log::{info};

pub struct Wifi<'a> {
    app: &'a tauri::App
}
impl<'a> Wifi<'a> {
    pub fn new(app: &'a tauri::App) -> Self {
        info!("Module Wifi initialized");
        Self { 
            app: app 
        }
    }
    // pub fn new(app) -> Wifi {
    //     Wifi {
    //         app: app
    //     }
    //     info!(target: "wifi", "Module Wifi initialized");
    // }

    pub fn get_wifi_status(&self) {
        let _id = self.app.listen_global("wifi-status-check", |event| {
              println!("got event-name with payload {:?}", event.payload());
        });
    }
}

