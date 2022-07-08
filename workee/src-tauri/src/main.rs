use tauri::Manager;
use log::{info, trace, warn};
use log4rs;
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

#[cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod wifi;


fn main() {
  tauri::Builder::default()
  .setup(|app| {
      log4rs::init_file("src/config/log4rs.yaml", Default::default()).unwrap();
      let wifi = wifi::Wifi::new(app);

      // let id = app.listen_global("wifi-status-check", |event| {
      //   println!("got event-name with payload {:?}", event.payload());
      // });
      // unlisten to the event using the `id` returned on the `listen_global` function
      // an `once_global` API is also exposed on the `App` struct
      // app.unlisten(id);
      app.emit_all("wifi-status", Payload { message: "Tauri is awesome!".into() }).unwrap();
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
