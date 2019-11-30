package org.rpc.base;

import java.util.Map;

public interface IAuth {

	public static final String FAIL = "FAIL";

	/*
	 * Rejects with 'FAIL' if not. Else returns some string saying what kind of
	 * auth. Eg: 'admin' for full. Or 'microsoft' would mean only for that company.
	 */
	public String auth(String user, String pswd, Map ctx);

}
