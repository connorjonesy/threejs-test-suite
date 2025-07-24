import sqlite3

def init_db():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    init_cubes_table = """CREATE TABLE IF NOT EXISTS cubes (
        cube_id INTEGER PRIMARY KEY AUTOINCREMENT,
        colour TEXT NOT NULL
    );"""
 
    init_presets_table = """CREATE TABLE IF NOT EXISTS presets (
        preset_id INTEGER PRIMARY KEY AUTOINCREMENT,
        preset_name TEXT
    );"""

    # linker table
    init_preset_cubes_table = """CREATE TABLE IF NOT EXISTS preset_cubes (
        preset_id INTEGER NOT NULL,
        cube_id INTEGER NOT NULL,
        position INTEGER NOT NULL CHECK (position IN (1, 2, 3)),
        FOREIGN KEY (preset_id) REFERENCES presets(preset_id) ON DELETE CASCADE, 
        FOREIGN KEY (cube_id) REFERENCES cubes(cube_id) ON DELETE RESTRICT,
        PRIMARY KEY (preset_id, position)
    );"""

    cursor.execute(init_cubes_table)
    #initial values of the cube colours, probably including # but maybe not
    default_cube_1_id = 1
    default_cube_1_colour = '#42ff29' 
    default_cube_2_id = 2
    default_cube_2_colour = '#007bff'
    default_cube_3_id = 3
    default_cube_3_colour = '#ff00a2'

    cursor.execute(init_presets_table)
    default_preset_id = 1
    default_preset_name = 'default'

  
    #check if default already exists
    cursor.execute("SELECT 1 FROM presets WHERE preset_id = ?", (default_preset_id,))
    if cursor.fetchone() is None:
        cursor.execute("INSERT INTO presets VALUES (?,?);", (default_preset_id, default_preset_name))
        cursor.execute("INSERT INTO cubes VALUES (?,?);", (default_cube_1_id, default_cube_1_colour))
        cursor.execute("INSERT INTO cubes VALUES (?,?);", (default_cube_2_id,default_cube_2_colour))
        cursor.execute("INSERT INTO cubes VALUES (?,?);", (default_cube_3_id,default_cube_3_colour))
        cursor.execute(init_preset_cubes_table)
        cursor.executemany("INSERT INTO preset_cubes (preset_id, cube_id, position) VALUES (?, ?, ?);",
                  [(default_preset_id, default_cube_1_id, 1),
                   (default_preset_id, default_cube_2_id, 2),
                   (default_preset_id, default_cube_3_id, 3)]) 
    

    connection.commit()
    connection.close()

def load_preset(preset_name):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()
    query = """
    SELECT presets.preset_name, cubes.cube_id, cubes.colour, preset_cubes.position
    FROM presets
    JOIN preset_cubes ON presets.preset_id = preset_cubes.preset_id
    JOIN cubes ON preset_cubes.cube_id = cubes.cube_id
    WHERE presets.preset_name = ?
    ORDER BY preset_cubes.position;
    """
    cursor.execute(query, (preset_name,))
    rows = cursor.fetchall()
    
    if not rows:
        return None
    
    preset = {
        'name': rows[0][0],
        'cube1': {'id': rows[0][1], 'colour': rows[0][2]},
        'cube2': {'id': rows[1][1], 'colour': rows[1][2]},
        'cube3': {'id': rows[2][1], 'colour': rows[2][2]}
    }
    connection.commit()
    connection.close()
    return preset


def save_preset(preset_name, colour1, colour2, colour3):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    cursor.execute("INSERT INTO presets (preset_name) VALUES (?);", (preset_name,))
    preset_id = cursor.lastrowid
    cursor.execute("INSERT INTO cubes (colour) VALUES (?);", (colour1,))
    cube1_id = cursor.lastrowid
    cursor.execute("INSERT INTO cubes (colour) VALUES (?);", (colour2,))
    cube2_id = cursor.lastrowid
    cursor.execute("INSERT INTO cubes (colour) VALUES (?);", (colour3,))
    cube3_id = cursor.lastrowid
    
    cursor.executemany("INSERT INTO preset_cubes (preset_id, cube_id, position) VALUES (?, ?, ?);",
                  [(preset_id, cube1_id, 1),
                   (preset_id, cube2_id, 2),
                   (preset_id, cube3_id, 3)]) 

    connection.commit()
    connection.close()