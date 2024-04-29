#include <SoftwareSerial.h>
SoftwareSerial mySerial(3,2);

int spam_counter;
int spam_window = 1000;
int curr_time;
int times_delayed = 0;
int baud_rate = 9600;

void setup() {
  Serial.begin(baud_rate); //open the serial port
  mySerial.begin(baud_rate); // open the bluetooth serial port
  spam_counter = 0;
  curr_time = millis();
}

void loop() {
  if(mySerial.available()){
    Serial.println(mySerial.readString()); // send from serial to bluetooth
    spam_counter++;
  }
  if(Serial.available()){
    mySerial.println(Serial.readString()); // send from bluetooth to serial
  }
  check_spam();
  modify_rate();

}

void check_spam() {
  if(spam_counter > 150) {
    delay (1000);
    spam_counter = 0;
    times_delayed++;
  }
  if((millis()-curr_time) > spam_window) {
    curr_time = millis();
    spam_counter = 0;
  }
}

void modify_rate() {
  if(times_delayed > 5) {
    mySerial.end();
    baud_rate = baud_rate/2;
    mySerial.begin(baud_rate);
    times_delayed = 0;
  }
}
