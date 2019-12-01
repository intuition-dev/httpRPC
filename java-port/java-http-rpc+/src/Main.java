import org.rpc.http.HttpMainService;

public class Main {

	static HttpMainService _srv;

	public static void main(String[] args) throws Exception {

		_srv = new HttpMainService();

		try {
			_srv.start(8888);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}// ()

}// class
