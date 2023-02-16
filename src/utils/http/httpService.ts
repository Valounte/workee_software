import axios from 'axios';
import { Config } from '../../Config';

export default class http {
    public static async get(url: string, params: any): Promise<any> {
        
        const res = await axios.get(Config.url + url, { params, headers: {
            'Authorization': localStorage.getItem('token') || ''
        }});
        return res.data;
    }

    public static async post(url: string, body: any, params: any = {}): Promise<any> {
        const res = await axios.post(Config.url + url, body, { params, headers: {
            'Authorization': localStorage.getItem('token') || ''
        }});
        return res.data;
    }

    public static async put(url: string, body: any, params: any): Promise<any> {
        const res = await axios.post(url, body, { params });
        return res.data;
    }

    public static async delete(url: string, params: any): Promise<any> {
        const res = await axios.delete(url, { params });
        return res.data;
    }

    public static async stockMetrics(): Promise<any> {
        let result = await http.get("/environment-metrics-preferences", "");
        let data: any = {};
        for (let i = 0; i < result.length; i++) {
            data[result[i].metricType] = !result[i].isDesactivated;
        }
        localStorage.setItem("metrics", JSON.stringify(data));
    }
}