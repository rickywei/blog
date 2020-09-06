# How to design a logger

My TinyLogger is here [https://github.com/RickyWei/TinyLogger](https://github.com/RickyWei/TinyLogger)

## Design API

1. There are two kinds of API format in C++
   1. `printf()`
   2. `cout<<`
2. `cout` is a easier way than printf since it does need format string(like`%s%d`)
3. Use `#define` to achieve more convient logger API

## Synchronize in multi-thread

1. To avoid logs are mixed, `formt()` function is used to promise only one `<< operator` will be executed to terminal and file stream
2. Following above design, no mutex and lock is needed during outputing to terminal or stringstream buffer. When push stringstream buffer to file stream, a lock is needed
3. One logger object just work with only one line log. This log line will be pushed to terminal and buffer in its destructor.

## Buffer

1. Generally, IO operator is slow, therefore, the design asynchronize log and log file
2. A file writter thread running in a loop with a timeout and is blocked when buffer size is not full. The timeout ensures that logs can be written to file in time even though the buffer is not full
3. There are two buffer in the system and they swap with each other which provide a free buffer to logger objects and avoid waiting. It reduce the critical section
4. The stringstream use string as its raw buf so the size can be auto adjusted when there are huge logs in short time

## Other fetures

1. Use [ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_sequences) to color different level Log
