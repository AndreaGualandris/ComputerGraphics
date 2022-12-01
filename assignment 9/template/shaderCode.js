

var vertexShaderCode =
    `#version 300 es
                in vec3 a_position;
                in vec3 a_color;
                in vec3 a_normal;

                out vec3 v_color;
                out vec3 v_normal;
                out vec3 v_viewDir;
                out vec3 v_lightDir;

                out vec3 v_pointLightDir;
                out float v_pointLightDist;

                // Exercise 1: add uniforms for all transformation matrices
                uniform mat4 modelMatrix;
                uniform mat4 viewMatrix;
                uniform mat4 projectionMatrix;
                

                // Exercise 3: add input attribute for normals
                //             add output variables required for light computation, e.g., normal, view direction etc.
                //             add here also a uniform for light direction, unless you pass it directly to the fragment shader
               

                uniform vec3 lightDir;
                uniform vec3 pointLightPos;

                void main(){
                    v_color = a_color;

                    // compute all the variables required for light computation in the fragment shader
                    // remember that all the locations and vectors have to be in a common space, e.g., eye/camera space
                    
                    v_normal = vec3(viewMatrix * modelMatrix * vec4(a_normal,0.0) );
                    v_pointLightDist = distance(a_position, pointLightPos);
                    v_pointLightDir =  vec3(viewMatrix * modelMatrix * vec4(a_position - pointLightPos,0.0));
                    
                    v_viewDir = vec3(viewMatrix * modelMatrix * vec4(a_position,1.0));
                    v_lightDir = vec3(viewMatrix * modelMatrix * vec4(lightDir,0.0));
                    
                    // replace the rotationMatrix with correct transformations
                    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(a_position,1.0);
                }`;

var fragmentShaderCode =
    `#version 300 es
                precision mediump float;

                in vec3 v_color;
                in vec3 v_normal;
                in vec3 v_viewDir;
                in vec3 v_lightDir;

                // point light direction and distance (bonus)
                in vec3 v_pointLightDir;
                in float v_pointLightDist;

                // Exercise 3: add all the input variable passed from the vertex shader
                //             if the do not include the light direction, you should add here an additional uniform for it
                //             you can also add here constants for Phong shading model, e.g., light color, ambient, diffuse, and specular coefficients, gamma value, as well as shininess
               
                const vec3 lightColor = vec3(1.0,1.0,1.0);

                const float ambientCoeff = 0.01;
                const float specularCoeff = 0.3;
                const float shininess = 10.0;
                const float diffuseCoeff = 0.4;

                const float gamma = 2.2;
                
                //point light color (bonus)
                const vec3 pointLightColor = vec3(0.8,0.8,0.8);
                
                out vec4 out_color;

                void main(){

                    // Exercise 3: add computation of Phong shading
                    //             do not forget about: normalizing all vectors beforehand, (2) performing gamma correction at the end

                    vec3 N = normalize(v_normal);
                    vec3 L = normalize(v_lightDir);
                    vec3 V = normalize(v_viewDir);
                    vec3 p_LightDir = normalize(-v_pointLightDir);

                    vec3 ambient = ambientCoeff * lightColor;
                    vec3 diffuse = diffuseCoeff * lightColor * max(dot(N,L),0.0);
                    vec3 R = reflect(L,N);
                    vec3 specular = specularCoeff * lightColor * pow(max(dot(R, V),0.0),shininess);

                    //point light (bonus)
                    vec3 diffusePoint = diffuseCoeff * pointLightColor * max(dot(N,p_LightDir),0.0);
                    vec3 RPoint = reflect(p_LightDir,N);
                    vec3 specularPoint = specularCoeff * pointLightColor * pow(max(dot(RPoint,V),0.0),shininess);
                    float attenuationDist = 1.0 / pow(max(v_pointLightDist,1.0),2.0);

                    //compute the final color
                    vec3 intensity = ambient + diffuse + specular + (diffusePoint + specularPoint) * attenuationDist;
                    intensity.rgb = pow(intensity, vec3(1.0/gamma));

                    out_color = vec4(v_color * intensity, 1.0);
                }`;