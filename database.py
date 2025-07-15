import sqlite3

def init_db():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    init_preset_table = """ CREATE TABLE IF NOT EXISTS presets (
    cube1_colour TEXT,
    cube2_colour TEXT,
    cube3_colour TEXT
    ) """

    cursor.execute(init_preset_table)
    #initial values of the cube colours
    cube1 = '42ff29'
    cube2 = '007bff'
    cube3 = 'ff00a2'

    cursor.execute("INSERT INTO presets VALUES (?,?,?)", (cube1,cube2,cube3))

    connection.commit()
    connection.close()