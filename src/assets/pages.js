export const pages = {
  PAGE_INTRO: 'PAGE_INTRO',
  PAGE_FAMILY_SETUP: 'PAGE_FAMILY_SETUP',
  PAGE_CITY_ONE: 'PAGE_CITY_ONE'
}

export const VIEW = {
  HOME: 'HOME',
  MAP: 'MAP',
  TREE: 'TREE',
  CHARACTER_INFO: 'CHARACTER_INFO'
}

export const pageInfo = {
  PAGE_CITY_ONE: {
    mapHeight: 4500,
    mapWidth: 6000,
    startingPoint: {x: 2300, y: 4440},
    blockedOffPixels: {
      assignments: {
        plants: {
          size: [120,3300],
          assignmentPosition: {
            plantLeft: [0,0],
            plantRight: [5880,0]
          }
        },
        topLeftArcadeWall: {
          size: [600,150], 
          assignmentPosition: {
            wallTopLeft: [0,3300],
            wallTopRight: [1300,3300]
          }
        },
        topRightArcadeWall: {
          size: [100,1200],
          assignmentPosition: {
            rightWall: [1900,3300]
          }
        },
        verticalArcadeGame: {
          size: [120,225],
          assignmentPosition: {
            leftGame: [0, 3900],
            topRightGame: [1750,3600],
            bottomRightGame: [1750,4150],
          }
        },
        horizontalArcadeGame: {
          size: [225,120],
          assignmentPosition: {
            game: [480,4380]
          }
        },
        topLeftTrainingRingWall: {
          size: [1200,150],
          assignmentPosition: {
            wall: [2650,3300]
          }
        },
        topRightTrainingRingWall: {
          size: [1600,150],
          assignmentPosition: {
            wall: [4400,3300]
          }
        },
        leftTrainingRingWall: {
          size: [100,1200],
          assignmentPosition: {
            wall: [2550,3300]
          }
        },
        townCenterVerticalWall: {
          size: [20,1660],
          assignmentPosition: {
            leftWall: [1000,1150],
            rightWall: [4880,1150]
          }
        },
        townCenterHorizontalLeftWall: {
          size: [1150,20],
          assignmentPosition: {
            wall: [1000, 2780]
          }
        },
        townCenterHorizontalRightWall: {
          size: [1665, 20],
          assignmentPosition: {
            wall: [2400,2780]
          }
        },
        townCenterHorizontalTopWall: {
          size: [4000, 20],
          assignmentPosition: {
            wall: [1000, 1150]
          }
        },
        eldersChamberDividerWall: {
          size: [20,580],
          assignmentPosition: {
            topWall: [4150,1150],
            bottomWall: [4150,2200]
          }
        },
        townCenterEntranceHallLeftWall: {
          size: [1,1200],
          assignmentPosition: {
            wall: [2150, 2800]
          }
        },
        townCenterEntranceHallRightWall: {
          size: [1,1200],
          assignmentPosition: {
            wall: [2299, 2800]
          }
        },
        foodCart: {
          size: [400, 400],
          assignmentPosition: {
            leftCart: [1000,130],
            middleCart: [2800,530],
            rightCart: [4500,200]
          }
        },
        shoppingStand: {
          size: [500,200],
          assignmentPosition: {
            leftStand: [1400,800],
            middleStand: [2500,0],
            rightStand: [3850,800] 
          }
        }
      },
      get areasBlockedCalculation() {
        const blockedAreas = [];
        for (let assignment in this.assignments) {
            for (let assignmentInstance of Object.values(this.assignments[assignment].assignmentPosition)) {
              blockedAreas.push([{x: assignmentInstance[0], y: assignmentInstance[1]},{x: assignmentInstance[0] + this.assignments[assignment].size[0], y: assignmentInstance[1] + this.assignments[assignment].size[1]}]);
            }
          }
        return blockedAreas;
      }
    },
    rooms: {
      list: [],
      assignments: {
        arcade: {
          size: [2000,1200],
          assignmentPosition: {
            arcade: [4000,3300]
          }
        }
      }
    }
  }
};