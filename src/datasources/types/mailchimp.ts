import { GSContext, GSDataSource, PlainObject } from "@godspeedsystems/core";
import mailchimpClient from '@mailchimp/mailchimp_marketing'
import md5 from 'md5';

export default class DataSource extends GSDataSource{
    protected async initClient(): Promise<PlainObject> {
        try {
            await mailchimpClient.setConfig({
                apiKey: this.config.apiKey,
                server: this.config.server
            });
            return mailchimpClient;

        } catch (error) {
            throw error;
        }
    }
    async execute(ctx: GSContext, args: PlainObject): Promise<any> {
        try {
            const {meta: {fnNameInWorkflow}, ...restArgs} = args;
            const method = fnNameInWorkflow.split('.')[2];
            const subMethod = fnNameInWorkflow.split('.')[3];
            const client = this.client;
            if (client) {
                const argArray = Object.values(restArgs);
                const response = await client[method][subMethod](...argArray);
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

}