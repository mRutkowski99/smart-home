import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";
import {AuthorizedUser} from "@smart-home/shared/user/util-user-vm";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<AuthorizedUser> {
        const user = await this.authService.validateUser(username, password);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}