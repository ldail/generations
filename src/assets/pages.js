const pages = [
  'intro',
  'setup',
  'cityOne'
]

export const cityOne = {
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
      }
    },
    get areasBlockedCalculation() {
      const blockedAreas = [];
      for (let assignment in this.assignments) {
        console.log(Object.values(this.assignments[assignment].assignmentPosition));
          for (let assignmentInstance of Object.values(this.assignments[assignment].assignmentPosition)) {
            blockedAreas.push([{x: assignmentInstance[0], y: assignmentInstance[1]},{x: assignmentInstance[0] + this.assignments[assignment].size[0], y: assignmentInstance[1] + this.assignments[assignment].size[1]}]);
          }
        }
        console.log(blockedAreas);
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
};

export default pages;