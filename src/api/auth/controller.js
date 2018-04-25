import { sign } from '../../services/jwt';
import { success } from '../../services/response/';
import { openSocket } from '../../services/run-forrest';

export const login = ({ user }, res, next) => {
  sign(user.id)
		.then((token) => {
			let socketInfo = openSocket(user, res);
			return { 
				user: user.view(true), 
				token,
				socket: socketInfo
			}
		})
		.then(success(res, 201))
		.catch(next);
}
