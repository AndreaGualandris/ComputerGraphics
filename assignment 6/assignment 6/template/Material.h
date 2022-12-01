//
//  Material.h
//  Raytracer
//
//  Created by Piotr Didyk on 14.07.21.
//

#ifndef Material_h
#define Material_h

#include "glm/glm.hpp"
#include "Textures.h"

/**
 Structure describing a material of an object
 */
struct Material{
    glm::vec3 ambient = glm::vec3(0.0f);
    glm::vec3 diffuse = glm::vec3(1.0f);
    glm::vec3 specular = glm::vec3(0.0f);
    float reflectivity = 0.0f;
    float refractivity = 1.0f;
    float shininess = 0.0f;
    glm::vec3 (* texture)(glm::vec2 uv) = NULL;

};

#endif /* Material_h */
