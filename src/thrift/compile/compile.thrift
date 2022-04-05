namespace * service.compile

enum Code {
    error = 0,
    success = 1
}

struct JsonData {
    1: string jsonStr
}

struct Data {
    1: Code code,
    2: optional string msg = '',
    3: JsonData data
}

service Compile {
    // xml编译为json
    Data Run(1: string xml)
}