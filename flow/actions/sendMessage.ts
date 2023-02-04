import {FlowCardAction} from 'homey';
import {TelegramNotifications} from '../../app';
import {BL} from "betterlogiclibrary";
import Utils from "../../utils";

export default class SendMessage {
    constructor(app: TelegramNotifications, card: FlowCardAction) {
        card.registerRunListener(async (args) => {
            if (app.bot != null) {
                await app.bot.telegram.sendMessage(args.user.id, await BL.decode(args.message))
                    .catch(app.error)
                    .then();
            }
        });
        card.registerArgumentAutocompleteListener(
            'user', async (query) => Utils.userAutocomplete(app.users, query)
        );
    }
}
