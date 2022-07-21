
use tauri::Manager;
use log::{info};

pub struct Wifi<'a> {
    app: &'a tauri::App
}
impl<'a> Wifi<'a> {
    pub fn new(app: &'a tauri::App) -> Self {
        info!("Module Wifi created");
        Self { 
            app: app 
        }
    }

    pub fn init_app_listener(&self) {
        self.scan_wifi();
    }

    fn scan_wifi(&self) {
        info!("Listener scan_wifi on");
        self.app.listen_global("scan-wifi", |event| {
              println!("got event-name with payload {:?}", event.payload());
        });
    }
}

