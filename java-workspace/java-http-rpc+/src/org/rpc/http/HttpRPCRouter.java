package org.rpc.http;

import java.io.IOException;
import java.lang.invoke.MethodHandles;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import org.apache.hc.core5.http.ClassicHttpRequest;
import org.apache.hc.core5.http.ClassicHttpResponse;
import org.apache.hc.core5.http.HttpException;
import org.apache.hc.core5.http.HttpStatus;
import org.apache.hc.core5.http.NameValuePair;
import org.apache.hc.core5.http.io.HttpRequestHandler;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.apache.hc.core5.http.protocol.HttpContext;
import org.apache.hc.core5.net.URLEncodedUtils;
import org.example.handlers.Screen1Handler;
import org.json.simple.JSONObject;
import org.rpc.base.AbstractRPCSRouter;
import org.rpc.base.IHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// https://hc.apache.org/httpcomponents-core-ga/tutorial/pdf/httpcore-tutorial.pdf
public class HttpRPCRouter extends AbstractRPCSRouter implements HttpRequestHandler {

	private static final Logger LOG = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

	static IHandler _handler1;

	public HttpRPCRouter() {
		_handler1 = new Screen1Handler();
	}

	@Override
	public void handle(final ClassicHttpRequest req, final ClassicHttpResponse resp, final HttpContext context)
			throws HttpException, IOException {

		// headers
		LOG.info(req.getHeader("Origin").toString());

		String path = req.getPath();
		int ppos = path.indexOf('?');
		path = path.substring(0,ppos);
		LOG.warn(path); // based on path: call a different handler!!! But here we have only one as example

		try {
			String url = req.getRequestUri();
			int upos = url.indexOf('?');
			url = url.substring(++upos);			

			List<NameValuePair> qsl = URLEncodedUtils.parse(url, StandardCharsets.UTF_8);

			Map<String, String> params = nvpMap(qsl);
			LOG.info(params.toString());
			
			String method = (String) params.get(IHandler.method);
			String ent = (String) params.get(IHandler.ent);
			
			Map m = _handler1.handleRPC(method, ent, params);
			LOG.info(m.toString());

			// good response
			// /////////////////////////////////////////////////////////////////////////////////////////////
			JSONObject ret = new JSONObject(m);
			final StringEntity outgoingEntity = new StringEntity(ret.toJSONString());

			good(resp, outgoingEntity);

		} catch (Exception e) {
			LOG.error(e.toString());

			// err response
			// /////////////////////////////////////////////////////////////////////////////////////////////
			final StringEntity outgoingEntity = new StringEntity("ERROR");
			err(resp, outgoingEntity);
		} // try

	}// ()

	protected void good(final ClassicHttpResponse response, StringEntity body) throws IOException {
		response.setCode(HttpStatus.SC_OK);
		response.setHeader("Access-Control-Allow-Origin", "*");

		response.setEntity(body);
		// response.close();
	}// ()

	protected void err(final ClassicHttpResponse response, StringEntity err) throws IOException {
		response.setCode(HttpStatus.SC_SERVER_ERROR);
		response.setHeader("Access-Control-Allow-Origin", "*");

		response.setEntity(err);
		response.close();
	}// ()

}// class
