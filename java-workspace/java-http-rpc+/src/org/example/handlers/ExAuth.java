package org.example.handlers;

import java.util.Map;

import org.rpc.base.IAuth;

public class ExAuth implements IAuth {

	@Override
	public String auth(String user, String pswd, Map ctx) {

		return "OK";
	}

}
