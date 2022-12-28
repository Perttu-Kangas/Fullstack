const { Model, DataTypes, Op } = require('sequelize')

const Note = require('./note')
const { sequelize } = require('../util/db')

class User extends Model {
  async numberOfNotes() {
    return (await this.getNotes()).length
  }

  static async withNotes(limit) {
    return await User.findAll({
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("notes.id")), "note_count"]
        ]
      },
      include: [
        {
          model: Note,
          attributes: []
        },
      ],
      group: ['user.id'],
      having: sequelize.literal(`COUNT(notes.id) > ${limit}`)
    })
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  defaultScope: {
    where: {
      disabled: false
    }
  },
  scopes: {
    admin: {
      where: {
        admin: true
      }
    },
    disabled: {
      where: {
        disabled: true
      }
    },
    name(value) {
      return {
        where: {
          name: {
            [Op.iLike]: value
          }
        }
      }
    },
  }
})

// kaikki adminit
const adminUsers = await User.scope('admin').findAll()

// kaikki epäaktiiviset käyttäjät
const disabledUsers = await User.scope('disabled').findAll()

// käyttäjät, joiden nimessä merkkijono jami
const jamiUsers = User.scope({ method: ['name', '%jami%'] }).findAll()

// adminit, joiden nimessä merkkijono jami
const jamiUsersAdmin = User.scope('admin', { method: ['name', '%jami%'] }).findAll()

// number of notes
const jami = await User.findOne({ name: 'Jami Kousa' })
const cnt = await jami.numberOfNotes()
console.log(`Jami has created ${cnt} notes`)

// with at least x notes, class method
const users = await User.withNotes(2)
console.log(JSON.stringify(users, null, 2))
users.forEach(u => {
  console.log(u.name)
})

module.exports = User