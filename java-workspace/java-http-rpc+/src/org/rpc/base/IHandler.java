package org.rpc.base;

import java.util.Map;

/**
 * 
 * HTTP-RPC+ + is for routing help and auth help
 *
 */
public interface IHandler {

	public IAuth getAuth();

	public static final String user = "user";
	public static final String pswd = "pswd";
	public static final String token = "token";

	public static final String method = "method";
	public static final String ent = "ent";

	/**
	 * Method takes a Map of params
	 */
	public Map handleRPC(final String method, final String ent, final Map<String, String> params);

	public static final String result = "result";
	public static final String errorLevel = "errorLevel";
	public static final String errorMessage = "errorMessage";

}
