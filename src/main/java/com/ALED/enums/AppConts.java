package com.ALED.enums;

public class AppConts {

    public static final String CONTENT_TYPE = "Content-Type";
    public static final String CONTENT_LENGTH = "Content-Length";
    public static final String VIDEO_CONTENT = "video/";
    public static final String CONTENT_RANGE = "Content-Range";
    public static final String ACCEPT_RANGES = "Accept-Ranges";
    public static final String BYTES = "bytes";
    public static final int BYTE_RANGE = 1024;
	// for address
	public class CountryConts {
		public static final int Provincial = 1;
		public static final int District = 2;
		public static final int Wards = 3;
		public static final int Village = 4;
	}

	public class TokenStatus {
		public final static String VALID = "VALID";
		public final static String OK = "OK";
		public final static String NOT_OK = "NOT_OK";
		public final static String EXP = "EXP";
		public final static String INVALID = "INVALID";
		public final static String ILLEGAL = "ILLEGAL";
		public final static String MALFORMED = "MALFORMED";
		public final static String UN_SUPPORT = "UN_SUPPORT";
	}

	public class ReturnCodeApi {
		public final static int SUCCESS = 1;
		public final static int ERROR = 0;
		public final static int SYS_ERROR = -1;
	}

	public class CountryType {
		public static final int Central = 1; /* Cấp trung ướng */
		public static final int Provincial = 2; /* Cấp tỉnh */
		public static final int District = 3; /* Cấp huyện */
		public static final int Wards = 4; /* Cấp xã */
	}

	public class KeyConstantsGroup {
		public final static int VOICE = 1;
	}

	public static final String DefaultPassword = "123456a@";

}
