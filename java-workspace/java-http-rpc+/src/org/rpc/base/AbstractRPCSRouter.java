package org.rpc.base;

import java.io.IOException;
import java.lang.invoke.MethodHandles;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.hc.core5.http.ClassicHttpResponse;
import org.apache.hc.core5.http.HttpStatus;
import org.apache.hc.core5.http.NameValuePair;
import org.apache.hc.core5.http.protocol.HttpContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractRPCSRouter {

	private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	protected void originNotAllowed(final ClassicHttpResponse response, HttpContext context) throws IOException {
		response.setCode(HttpStatus.SC_FORBIDDEN);
		response.setEntity(null);
		response.close();
	}// ()

	
	protected Map<String, String> nvpMap(List<NameValuePair> qsl) {
		Map m = new HashMap();
		for (NameValuePair el : qsl)
			m.put(el.getName(), el.getValue());
		return m;
	}

	
}// class
