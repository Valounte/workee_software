
use tauri::Manager;
use log::{error, info, warn};
use log4rs;
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

    // fn getWifiStatus() {
    //     println!("Hello, world!");
    // }
}

