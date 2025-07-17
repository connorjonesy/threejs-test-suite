import sqlite3

def init_db():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    init_cubes_table = """CREATE TABLE IF NOT EXISTS cubes (
        cube_id INTEGER PRIMARY KEY AUTOINCREMENT,
        color TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );"""

    init_presets_table = """CREATE TABLE IF NOT EXISTS presets (
        preset_id INTEGER PRIMARY KEY AUTOINCREMENT,
        preset_name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );"""

    # linker table
    init_preset_cubes_table = """CREATE TABLE IF NOT EXISTS preset_cubes (
        preset_id INTEGER NOT NULL,
        cube_id INTEGER NOT NULL,
        position INTEGER NOT NULL CHECK (position IN (1, 2, 3)),  # the ORDER of the cubes, only allow 3 positions
        FOREIGN KEY (preset_id) REFERENCES presets(preset_id) ON DELETE CASCADE,
        FOREIGN KEY (cube_id) REFERENCES cubes(cube_id) ON DELETE RESTRICT,
        PRIMARY KEY (preset_id, position)  # Ensures each preset has only one cube per position
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

    cursor.execute("INSERT INTO presets VALUES (?,?);", (default_preset_id, default_preset_name))
    cursor.execute("INSERT INTO cubes VALUES (?,?);", (default_cube_1_id,default_cube_1_colour))
    cursor.execute("INSERT INTO cubes VALUES (?,?);", (default_cube_2_id,default_cube_2_colour))
    cursor.execute("INSERT INTO cubes VALUES (?,?);", (default_cube_3_id,default_cube_3_colour))

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
    SELECT presets.preset_name, cubes.cube_id, cubes.color, preset_cubes.position
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
        'cube1': {'id': rows[0][1], 'color': rows[0][2], 'size': rows[0][3]},
        'cube2': {'id': rows[1][1], 'color': rows[1][2], 'size': rows[1][3]},
        'cube3': {'id': rows[2][1], 'color': rows[2][2], 'size': rows[2][3]}
    }
    connection.commit()
    connection.close()
    return preset


def save_preset():
    print("test")