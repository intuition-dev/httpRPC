package org.example.handlers;

import java.lang.invoke.MethodHandles;
import java.util.HashMap;
import java.util.Map;

import org.rpc.base.IAuth;
import org.rpc.base.IHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * ~ Business Layer
 *
 */
public class Screen1Handler implements IHandler {

	private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	protected static IAuth _auth;

	public Screen1Handler() {
		_auth = new ExAuth();
	}

	@Override
	public Map handleRPC(final String method, final String ent, final Map<String, String> params) {
		Map resp = new HashMap();

		String user =  params.get(IHandler.user);
		String pswd =  params.get(IHandler.pswd);

		String auth = _auth.auth(user, pswd, params);

		if (IAuth.FAIL == auth) {
			resp.put(IHandler.errorLevel, -1);
			resp.put(IHandler.errorMessage, "failed auth " + user);
			return resp;
		} // fi

		if ("multiply".equals(method)) {
			long a = Long.parseLong( params.get("a"));
			long b = Long.parseLong( params.get("b"));

			long c = multiply(a, b);

			resp.put(IHandler.result, c);
			return resp;
		}

		if ("log".equals(method)) {
			handleLog(params);
			return resp;
		}

		resp.put(IHandler.errorLevel, -1);
		resp.put(IHandler.errorMessage, "handling error for " + method);
		return resp;
	}

	protected long multiply(long a, long b) {
		return a * b;
	}// ()

	protected void handleLog(Map params) {
		LOG.warn("LOG");
		LOG.warn(params.toString());
	}// ()

	@Override
	public IAuth getAuth() {
		return _auth;
	}

}// ()
