export default class EventsUtils {
    static subscribe(event: any, callback: any) {
        document.addEventListener(event, callback);
    }

    static unsubscribe(event: any, callback: any) {
        document.removeEventListener(event, callback);
    }

    static dispatch(event: any, data: any) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    }
}