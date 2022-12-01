//
//  Textures.h
//  Raytracer
//
//  Created by Piotr Didyk on 19.08.21.
//

#ifndef Textures_h
#define Textures_h

#include "glm/glm.hpp"

glm::vec3 checkerboardTexture(glm::vec2 uv)
{
    int size = 2;
    
    int texture = (int) (floor(3*uv.x * size) + floor(14*uv.y * size))% 2;

    if (texture == 0) 
        return glm::vec3(1);
    else 
        return glm::vec3(0);
}

glm::vec3 rainbowTexture(glm::vec2 uv)
{

    float u = uv.x;
    float v = uv.y;
    
    float texture = (int) ((3*uv.x) + 2*(10*uv.y)) % 3;

    if (texture == 0)
    {
        return glm::vec3(0.0, 0.0, 1.0);
    }
    else if (texture == 1)
    {
        return glm::vec3(1.0, 0.0, 0.0);
    }
    else
    {
        return glm::vec3(0.0, 1.0, 0.0);
    }


    


    // return glm::vec3(sin(200 * u), cos(200 * v), sin(200 * u) * cos(200 * v));
   // return glm::vec3((sin(200*uv.x + 150*uv.y));


  
   // return glm::vec3(r, g, b);
}


#endif /* Textures_h */
