import telebot
from telebot.types import WebAppInfo
from telebot import types
import logging
from datetime import datetime
import json
import os

# Initialize bot
bot = telebot.TeleBot('TOKEN')

def save_user_log(user_data):
    filename = 'userlog.json'
    
    try:
        # Read existing logs
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                try:
                    logs = json.load(f)
                except json.JSONDecodeError:
                    logs = []
        else:
            logs = []
            
        # Add new user data
        logs.append(user_data)
        
        # Write updated logs back to file
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(logs, f, indent=2, ensure_ascii=False)
            f.flush()  # Force write to disk
            
        print(f"Successfully saved log for user {user_data['username']}")
            
    except Exception as e:
        print(f"Error in save_user_log: {str(e)}")

@bot.message_handler(commands=['start'])
def start(message):
    try:
        # Create user log entry
        user_data = {
            "user_id": message.from_user.id,
            "username": message.from_user.username,
            "first_name": message.from_user.first_name,
            "last_name": message.from_user.last_name,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        # Save user data to json file
        save_user_log(user_data)

        markup = types.ReplyKeyboardMarkup(resize_keyboard=True)
        markup.add(types.KeyboardButton(
            text="Play Game",
            web_app=WebAppInfo(url="https://kaleidoscopic-panda-685dc1.netlify.app/")
        ))
        
        bot.send_message(
            message.chat.id,
            "Welcome! Click the button below to play the game:",
            reply_markup=markup
        )
    except Exception as e:
        print(f"Error in start handler: {str(e)}")

bot.polling()
